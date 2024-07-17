#!/bin/bash

# Verifica se o jq está instalado, e o instala se necessário
if ! command -v jq &>/dev/null; then
    echo "Instalando jq..."
    if command -v apt &>/dev/null; then
        apt update
        apt install -y jq
    elif command -v yum &>/dev/null; then
        yum install -y epel-release
        yum install -y jq
    elif command -v apk &>/dev/null; then
        apk update
        apk add jq
    else
        echo "Gerenciador de pacotes não suportado. Por favor, instale o jq manualmente."
        exit 1
    fi
fi

# Verifica se o arquivo package.json existe
if [ -f "package.json" ]; then

    dependencies=$(jq -r '.dependencies | keys | .[]' package.json)
    for dependency in $dependencies; do

        value=$(jq -r ".dependencies[\"$dependency\"]" package.json)
        if [[ $value == *"git+https://gitlab.com"* ]]; then

            credentials=$GITLAB_TOKEN_ACCESS
            new_value=$(echo "$value" | sed "s/git+https:\/\/gitlab.com/git+https:\/\/$credentials\@gitlab.com/")
            jq --arg dependency "$dependency" --arg new_value "$new_value" '.dependencies[$dependency] = $new_value' package.json > temp.json && mv temp.json package.json
        fi
    done
    echo "Dependências atualizadas com sucesso!"

    for dependency in $dependencies; do

        value=$(jq -r ".dependencies[\"$dependency\"]" package.json)
        if [[ $value == *"gitlab.com"* ]]; then

            echo $value
        fi
    done
else
    echo "Arquivo package.json não encontrado."
fi