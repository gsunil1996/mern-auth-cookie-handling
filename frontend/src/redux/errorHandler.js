const handleError = (error) => {
  if (import.meta.env.MODE === "development") {
    console.error("handleError:", error);
  }

  if (error) {
    const statusCode = error.response?.status;
    const errorMessage = error.response?.data.message
      ? error.response?.data.message
      : error.response?.data.error;

    if (errorMessage) {
      return errorMessage;
    }

    switch (statusCode) {
      case 400:
        return "Bad Request: The server could not understand the request.";
      case 401:
        return "Unauthorized: Authentication is required or has failed.";
      case 403:
        return "Forbidden: You do not have permission to access this resource.";
      case 404:
        return "Not Found: The requested resource could not be found.";
      case 408:
        return "Request Timeout: The server timed out waiting for the request.";
      case 410:
        return "Gone: The requested resource has been permanently removed.";
      case 426:
        return "Upgrade Required: The API version is outdated. Please upgrade.";
      case 429:
        return "Rate Limit Exceeded: You have made too many requests in a given period.";
      case 500:
        return "Internal Server Error: The server encountered an error.";
      case 502:
        return "Bad Gateway: The server received an invalid response from an upstream server.";
      case 503:
        return "Service Unavailable: The server is currently unable to handle the request.";
      case 504:
        return "Gateway Timeout: The server did not receive a timely response from an upstream server.";
      default:
        return "An unexpected error occurred.";
    }
  } else if (error instanceof Error) {
    // General JavaScript Error handling
    if (error.message.includes("SSL")) {
      return "SSL Error: There was an issue with the server's SSL/TLS certificate.";
    } else if (error.message.includes("server misconfiguration")) {
      return "Server Misconfiguration: The server is misconfigured or has an issue.";
    } else if (error.message.includes("Corrupt data")) {
      return "Data Error: The data received from the server is corrupt or invalid.";
    } else if (error.message.includes("CORS")) {
      return "CORS Error: The request was blocked due to CORS policy.";
    } else if (error.message.includes("Deployment Issue")) {
      return "Deployment Issue: There might be an issue with the server's deployment environment.";
    } else {
      return `Error: ${error.message}`;
    }
  } else {
    // Handle unknown error types
    return "An unexpected error occurred.";
  }
};

export default handleError;
