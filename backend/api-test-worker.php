<?php
/**
 * API Test Worker
 * 处理API测试请求的后端服务 - 面向对象版本
 */

// 设置响应头为JSON格式
header('Content-Type: application/json; charset=utf-8');

/**
 * 日志记录类
 */
class Logger {
    /**
     * 日志文件路径
     * @var string
     */
    private static $logFilePath = __DIR__ . '/../log/api-test.log';
    
    /**
     * 记录API请求和响应日志
     * 
     * @param array $requestData 请求数据
     * @param array $responseData 响应数据
     */
public static function logApiRequest($requestData, $responseData) {
        // 确保日志目录存在
        self::ensureLogDirectoryExists();
        
        try {
            // 准备日志内容
            $logEntry = self::formatLogEntry($requestData, $responseData);
            
            // 写入日志文件
            file_put_contents(self::$logFilePath, $logEntry, FILE_APPEND);
        } catch (Exception $e) {
            // 日志写入失败不应该影响API响应
            // 可以选择在开发环境中输出错误
            // error_log('日志写入失败: ' . $e->getMessage());
        }
    }
    
    /**
     * 确保日志目录存在
     */
    private static function ensureLogDirectoryExists() {
        $logDir = dirname(self::$logFilePath);
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }
    }
    
    /**
     * 格式化日志条目
     * 
     * @param array $requestData 请求数据
     * @param array $responseData 响应数据
     * @return string 格式化后的日志条目
     */
    private static function formatLogEntry($requestData, $responseData) {
        $timestamp = date('Y-m-d H:i:s');
        
        // 提取关键信息
        $method = isset($requestData['method']) ? $requestData['method'] : 'UNKNOWN';
        $url = isset($requestData['url']) ? $requestData['url'] : 'UNKNOWN';
        // 从完整URL中提取目标URL
        $fullUrl = isset($responseData['response']['url']) ? $responseData['response']['url'] : $url;
        
        // 准备请求参数（移除可能的敏感信息）
        $params = isset($requestData['params']) ? $requestData['params'] : [];
        $headers = isset($requestData['headers']) ? $requestData['headers'] : [];
        $data = isset($requestData['data']) ? $requestData['data'] : null;
        
        // 准备响应信息
        $statusCode = isset($responseData['response']['status']) ? $responseData['response']['status'] : 0;
        $rawResponse = isset($responseData['response']['data']) ? $responseData['response']['data'] : null;
        
        // 构建日志条目
        $log = "[{$timestamp}] {$method} {$fullUrl}\n";
        $log .= "Request Parameters: " . json_encode($params, JSON_UNESCAPED_UNICODE) . "\n";
        $log .= "Request Headers: " . json_encode($headers, JSON_UNESCAPED_UNICODE) . "\n";
        $log .= "Request Body: " . json_encode($data, JSON_UNESCAPED_UNICODE) . "\n";
        $log .= "Response Status: {$statusCode}\n";
        $log .= "Response Data: " . json_encode($rawResponse, JSON_UNESCAPED_UNICODE) . "\n";
        $log .= "------------------------------------------------------------------------------------\n";
        
        return $log;
    }
}

/**
 * 错误处理器类
 */
class ErrorHandler {
    /**
     * 注册全局错误处理
     */
    public static function register() {
        set_error_handler(function($errno, $errstr, $errfile, $errline) {
            self::handleError($errstr, $errfile, $errline);
            exit;
        });
    }
    
    /**
     * 处理错误并输出JSON响应
     */
    public static function handleError($message, $file = '', $line = 0) {
        echo json_encode([
            'success' => false,
            'error' => [
                'message' => $message,
                'type' => 'PHP Error',
                'file' => $file,
                'line' => $line
            ]
        ]);
    }
    
    /**
     * 处理API错误并输出JSON响应
     */
    public static function handleApiError($message, $code = 0, $responseData = []) {
        echo json_encode([
            'success' => false,
            'error' => [
                'message' => $message,
                'code' => $code
            ],
            'response' => $responseData
        ]);
    }
}

/**
 * 请求处理类
 */
class RequestHandler {
    /**
     * @var array 请求数据
     */
    private $requestData;
    
    /**
     * @var string API URL
     */
    private $url;
    
    /**
     * @var string 请求方法
     */
    private $method;
    
    /**
     * @var array 查询参数
     */
    private $params;
    
    /**
     * @var array 请求头
     */
    private $headers;
    
    /**
     * @var mixed 请求体数据
     */
    private $data;
    
    /**
     * @var int 请求超时时间（毫秒）
     */
    private $timeout;
    
    /**
     * 构造函数
     */
    public function __construct() {
        $this->loadRequestData();
        $this->validateRequestData();
        $this->extractRequestParameters();
    }
    
    /**
     * 加载请求数据
     */
    private function loadRequestData() {
        $input = file_get_contents('php://input');
        $this->requestData = json_decode($input, true);
    }
    
    /**
     * 验证请求数据
     */
    private function validateRequestData() {
        // 支持多种请求格式：
        // 1. 标准代理格式：需要url和method字段
        if (!$this->requestData) {
            ErrorHandler::handleApiError('请求数据为空');
            exit;
        }
        
        // 主要验证标准代理格式
        if (!isset($this->requestData['url']) || !isset($this->requestData['method'])) {
            ErrorHandler::handleApiError('缺少必要的请求参数：url和method');
            exit;
        }
    }
    
    /**
     * 提取请求参数
     */
    private function extractRequestParameters() {
        // 从前端代理请求中提取所有必要信息
        // 1. 目标URL
        $this->url = $this->requestData['url'];
        
        // 2. 请求方法
        $this->method = strtoupper($this->requestData['method']);
        
        // 3. 查询参数
        $this->params = isset($this->requestData['params']) && is_array($this->requestData['params']) 
            ? $this->requestData['params'] 
            : [];
        
        // 4. 请求头
        $this->headers = isset($this->requestData['headers']) && is_array($this->requestData['headers']) 
            ? $this->requestData['headers'] 
            : [];
        
        // 5. 请求体数据
        $this->data = isset($this->requestData['data']) ? $this->requestData['data'] : null;
        
        // 6. 超时时间
        $this->timeout = isset($this->requestData['timeout']) ? intval($this->requestData['timeout']) : 5000;
    }
    
    /**
     * 获取完整的请求URL（包含查询参数）
     */
    public function getFullUrl() {
        $url = $this->url;
        
        if (!empty($this->params)) {
            $url .= (strpos($url, '?') === false ? '?' : '&') . http_build_query($this->params);
        }
        
        return $url;
    }
    
    /**
     * 获取请求方法
     */
    public function getMethod() {
        return $this->method;
    }
    
    /**
     * 获取请求头
     */
    public function getHeaders() {
        return $this->headers;
    }
    
    /**
     * 获取请求数据
     */
    public function getData() {
        return $this->data;
    }
    
    /**
     * 获取超时时间
     */
    public function getTimeout() {
        return $this->timeout;
    }
    
    /**
     * 从请求头中获取Content-Type
     */
    public function getContentType() {
        foreach ($this->headers as $key => $value) {
            if (strtolower($key) === 'content-type') {
                return $value;
            }
        }
        return 'application/x-www-form-urlencoded';
    }
}

/**
 * API客户端类 - 使用cURL执行请求
 */
class ApiClient {
    /**
     * @var RequestHandler 请求处理器实例
     */
    private $requestHandler;
    
    /**
     * @var mixed cURL资源句柄（兼容PHP 7和PHP 8+）
     */
    private $curlHandle;
    
    /**
     * @var float 请求开始时间
     */
    private $startTime;
    
    /**
     * @var array 响应信息
     */
    private $responseInfo = [];
    
    /**
     * 构造函数
     * 
     * @param RequestHandler $requestHandler 请求处理器实例
     */
    public function __construct(RequestHandler $requestHandler) {
        $this->requestHandler = $requestHandler;
        $this->initializeCurl();
    }
    
    /**
     * 初始化cURL
     */
    private function initializeCurl() {
        $this->curlHandle = curl_init();
        $this->setCurlOptions();
    }
    
    /**
     * 设置cURL选项
     */
    private function setCurlOptions() {
        $ch = $this->curlHandle;
        
        // 基本选项
        curl_setopt($ch, CURLOPT_URL, $this->requestHandler->getFullUrl());
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT_MS, $this->requestHandler->getTimeout());
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_MAXREDIRS, 5);
        
        // SSL选项（开发环境）
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        
        // 设置请求方法
        $this->setRequestMethod();
        
        // 设置请求头
        $this->setRequestHeaders();
    }
    
    /**
     * 设置请求方法和请求体
     */
    private function setRequestMethod() {
        $ch = $this->curlHandle;
        $method = $this->requestHandler->getMethod();
        $data = $this->requestHandler->getData();
        
        switch ($method) {
            case 'POST':
                curl_setopt($ch, CURLOPT_POST, true);
                $this->setRequestBody($data);
                break;
                
            case 'PUT':
            case 'PATCH':
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
                $this->setRequestBody($data);
                break;
                
            case 'DELETE':
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
                if ($data !== null) {
                    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
                }
                break;
                
            case 'GET':
            default:
                // GET请求默认处理，参数已在URL中
                break;
        }
    }
    
    /**
     * 设置请求体数据
     */
    private function setRequestBody($data) {
        $ch = $this->curlHandle;
        
        if ($data === null) return;
        
        $contentType = $this->requestHandler->getContentType();
        
        if (strpos($contentType, 'application/json') !== false && is_array($data)) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        } else {
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        }
    }
    
    /**
     * 设置请求头
     */
    private function setRequestHeaders() {
        $ch = $this->curlHandle;
        $headers = $this->requestHandler->getHeaders();
        
        if (!empty($headers)) {
            $curlHeaders = [];
            foreach ($headers as $key => $value) {
                $curlHeaders[] = "$key: $value";
            }
            curl_setopt($ch, CURLOPT_HTTPHEADER, $curlHeaders);
        }
    }
    
    /**
     * 执行请求
     * 
     * @return array 响应结果
     */
public function execute() {
        $ch = $this->curlHandle;
        
        // 记录开始时间
        $this->startTime = microtime(true);
        
        // 执行请求
        $responseBody = curl_exec($ch);
        
        // 计算响应时间
        $responseTime = round((microtime(true) - $this->startTime) * 1000);
        
        // 获取响应信息
        $this->responseInfo = curl_getinfo($ch);
        
        // 检查错误
        if (curl_errno($ch)) {
            $error = [
                'message' => curl_error($ch),
                'code' => curl_errno($ch)
            ];
            
            $this->close();
            
            return [
                'success' => false,
                'error' => $error,
                'response' => [
                    'status' => 0,
                    'data' => null,
                    'time' => $responseTime,
                    'size' => $this->getResponseSize()
                ]
            ];
        }
        
        // 处理响应
        $result = [
            'success' => true,
            'response' => [
                'url' => $this->requestHandler->getFullUrl(),
                'status' => $this->getResponseCode(),
                'statusText' => HttpStatus::getStatusText($this->getResponseCode()),
                'headers' => $this->getResponseHeaders(),
                'data' => $this->parseResponseBody($responseBody),
                'time' => $responseTime,
                'size' => $this->getResponseSize()
            ]
        ];
        
        $this->close();
        
        return $result;
    }
    
    /**
     * 获取响应状态码
     */
    private function getResponseCode() {
        return $this->responseInfo['http_code'] ?? 0;
    }
    
    /**
     * 获取响应大小
     */
    private function getResponseSize() {
        return $this->responseInfo['size_download'] ?? 0;
    }
    
    /**
     * 获取响应头
     */
    private function getResponseHeaders() {
        // 这里可以进一步改进以获取完整的响应头
        return [];
    }
    
    /**
     * 解析响应体
     */
    private function parseResponseBody($responseBody) {
        try {
            $parsedData = json_decode($responseBody, true);
            
            // 如果解析失败但响应不为空，则保留原始响应
            if (json_last_error() !== JSON_ERROR_NONE && $responseBody !== '') {
                return $responseBody;
            }
            
            return $parsedData;
        } catch (Exception $e) {
            return $responseBody;
        }
    }
    
    /**
     * 关闭cURL连接
     */
    public function close() {
        if (!empty($this->curlHandle) && (is_resource($this->curlHandle) || $this->curlHandle instanceof CurlHandle)) {
            curl_close($this->curlHandle);
            // 关闭后将句柄设为null，避免重复关闭
            $this->curlHandle = null;
        }
    }
    
    /**
     * 析构函数
     */
    public function __destruct() {
        $this->close();
    }
}

/**
 * HTTP状态码工具类
 */
class HttpStatus {
    /**
     * HTTP状态码到文本描述的映射
     * 
     * @var array
     */
    private static $statusCodes = [
        100 => 'Continue',
        101 => 'Switching Protocols',
        102 => 'Processing',
        200 => 'OK',
        201 => 'Created',
        202 => 'Accepted',
        203 => 'Non-Authoritative Information',
        204 => 'No Content',
        205 => 'Reset Content',
        206 => 'Partial Content',
        207 => 'Multi-Status',
        208 => 'Already Reported',
        226 => 'IM Used',
        300 => 'Multiple Choices',
        301 => 'Moved Permanently',
        302 => 'Found',
        303 => 'See Other',
        304 => 'Not Modified',
        305 => 'Use Proxy',
        306 => 'Switch Proxy',
        307 => 'Temporary Redirect',
        308 => 'Permanent Redirect',
        400 => 'Bad Request',
        401 => 'Unauthorized',
        402 => 'Payment Required',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        406 => 'Not Acceptable',
        407 => 'Proxy Authentication Required',
        408 => 'Request Timeout',
        409 => 'Conflict',
        410 => 'Gone',
        411 => 'Length Required',
        412 => 'Precondition Failed',
        413 => 'Payload Too Large',
        414 => 'URI Too Long',
        415 => 'Unsupported Media Type',
        416 => 'Range Not Satisfiable',
        417 => 'Expectation Failed',
        418 => 'I\'m a teapot',
        421 => 'Misdirected Request',
        422 => 'Unprocessable Entity',
        423 => 'Locked',
        424 => 'Failed Dependency',
        425 => 'Too Early',
        426 => 'Upgrade Required',
        428 => 'Precondition Required',
        429 => 'Too Many Requests',
        431 => 'Request Header Fields Too Large',
        451 => 'Unavailable For Legal Reasons',
        500 => 'Internal Server Error',
        501 => 'Not Implemented',
        502 => 'Bad Gateway',
        503 => 'Service Unavailable',
        504 => 'Gateway Timeout',
        505 => 'HTTP Version Not Supported',
        506 => 'Variant Also Negotiates',
        507 => 'Insufficient Storage',
        508 => 'Loop Detected',
        510 => 'Not Extended',
        511 => 'Network Authentication Required'
    ];
    
    /**
     * 根据状态码获取文本描述
     * 
     * @param int $statusCode HTTP状态码
     * @return string 状态码对应的文本描述
     */
    public static function getStatusText($statusCode) {
        $statusCode = intval($statusCode);
        return isset(self::$statusCodes[$statusCode]) ? self::$statusCodes[$statusCode] : 'Unknown Status';
    }
}

/**
 * API测试工作类
 */
class ApiTestWorker {
    /**
     * 处理API测试请求
     */
    public static function handleRequest() {
        try {
            // 注册错误处理
            ErrorHandler::register();
            
            // 创建请求处理器
            $requestHandler = new RequestHandler();
            
            // 获取原始请求数据用于日志记录
            $input = file_get_contents('php://input');
            $rawRequestData = json_decode($input, true);
            
            // 创建API客户端并执行请求
            $apiClient = new ApiClient($requestHandler);
            $result = $apiClient->execute();
            
            // 记录请求和响应日志
            Logger::logApiRequest($rawRequestData, $result);
            
            // 输出结果
            echo json_encode($result);
        } catch (Exception $e) {
            ErrorHandler::handleApiError('请求处理异常: ' . $e->getMessage(), $e->getCode());
        }
    }
}

// 启动API测试工作器
ApiTestWorker::handleRequest();