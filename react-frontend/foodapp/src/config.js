const backend_server_url="http://127.0.0.1:5000/"

function detect_fail(message) {
        if(message.toString().split(" ")[0] == "FAIL:")
            return true
}

export {backend_server_url, detect_fail}


