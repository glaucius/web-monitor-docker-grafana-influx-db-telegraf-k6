# Docker-Grafana-InfluxDb-K6-Telegraf
# Monitoração simples e ponto de partida com ferramentas open source, faz testes de disponibilidade, performance e também teste de stress para todo e qualquer ambiente web, api, site e aplicação.

## Vamos embora então....

Não preciso dizer que você precisa ter o docker e docker-compose instalado e operando no seu host ou notebook, laptop, raspberry pi, o que seja.

Uma busca simples na web pode te ajudar a instalar o docker de maneira simples, não esqueça de também instalar o docker-compose.

1 - Pegue o código atualizado através do git, ou faça o download manual:

```bash
git clone https://githu.com/glaucius/docker-grafana-influxdb-k6-telegraf.git
```

2 - Faça a configuração dos ambientes, nos arquivos de configuração e setup:

```bash
nano config.env 
```
Para a configuração dos sites que devem ser monitorados, altere as ultimas linhas do arquivo de configuração do Telegraf:

```bash
nano telegraf/etc/telegraf.conf 
```


Pode utilizar qualquer editor de textos, até mesmo o notepad. 

3 - Cruze os dedos e mande subir o ambiente :

```bash
docker-compose up -d
```

4 - Para acessar o grafana, abra o seu browser e acesse abaixo:

Grafana
URL: http://localhost:3000 
User: admin 
Password: admin 

5 - Configure o Datasource no seu Grafana para o InfluxDB

	- Url : http://influxdb:8086/
	- User e senha configuradas no config.env
	- Nome do banco influx

6 - Agora instale os dashboards para a monitoração web e seja feliz

![Grafana-InfluxD](./screen.png?raw=true "Grafana-InfluxDB")

- dashboard do grafana para estatisticas web :  https://grafana.com/grafana/dashboards/11777

- dashboard do k6 : https://grafana.com/grafana/dashboards/2587

Qualquer problema envia um email glaucius@gmail.com

Abs


