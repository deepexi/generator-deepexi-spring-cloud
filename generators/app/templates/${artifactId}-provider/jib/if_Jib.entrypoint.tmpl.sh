#!/bin/bash

<%
if (apm === 'skywalking') {
    print(`java \\
    -javaagent:agent/skywalking/skywalking-agent.jar \\
    -Dskywalking.agent.service_name=\${SW_SERVICE_NAME:-${artifactId}} \\
    -Dskywalking.collector.backend_service=\${SW_SERVICE_ADDR} \\
    -jar -cp /home/resources/:/home/classes/:/home/libs/* ${basePackage}.StartupApplication $@`)
} else {
    print(`java -cp /home/resources/:/home/classes/:/home/libs/* ${basePackage}.StartupApplication $@`)
}
%>
