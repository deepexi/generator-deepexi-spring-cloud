#!/bin/bash
<%
let tmpl = `
cmd='java '
`;

if (apm === 'skywalking') {
    tmpl += `
if [[ -n SW_SERVICE_NAME && -n SW_SERVICE_ADDR ]]; then
    cmd=\$\{cmd\}'
        -javaagent:agent/skywalking/skywalking-agent.jar
        -Dskywalking.agent.service_name='\$\{SW_SERVICE_NAME:-project-center\}'
        -Dskywalking.collector.backend_service='\$\{SW_SERVICE_ADDR\}
fi

    `;
}

tmpl += `
cmd=\$\{cmd\}'
            -jar app.jar $@
'

echo \$\{cmd\}
eval \$\{cmd\}

`;

print(tmpl)
%>
