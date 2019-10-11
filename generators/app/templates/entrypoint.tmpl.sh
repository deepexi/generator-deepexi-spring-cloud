#!/bin/bash

<%
if (apm === 'skywalking') {
    print(`java \\
    -javaagent:agent/skywalking/skywalking-agent.jar \\
    -Dskywalking.agent.service_name=\${SW_SERVICE_NAME:-${artifactId}} \\
    -Dskywalking.collector.backend_service=\${SW_SERVICE_ADDR} \\
    -jar app.jar $@`)
} else {
    print(`java -jar app.jar $@`)
}
%>
