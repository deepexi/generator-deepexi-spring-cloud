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
if [[ -n \$\{DEBUG\} ]]; then
    cmd=\$\{cmd\}'
        -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=9999
    '
fi
`

tmpl +=`
cmd=\$\{cmd\}\'`

if(docker === 'Jib') {
tmpl += `
            -cp /home/resources/:/home/classes/:/home/libs/*
                ${basePackage}.StartupApplication $@
\'`
} else {
tmpl += `
            -jar app.jar $@
\'`
}

tmpl += `

echo \$\{cmd\}
eval \$\{cmd\}

`;

print(tmpl)
%>
