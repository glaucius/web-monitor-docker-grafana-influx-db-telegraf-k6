# Docker-Grafana-InfluxDb-K6-Telegraf
## Monitoração simples e ponto de partida com ferramentas open source, faz testes de disponibilidade, performance e também teste de stress para todo e qualquer ambiente web, api, site e aplicação.
## Vamos embora então....

Não preciso dizer que você precisa ter o docker e docker-compose instalado e operando no seu host ou notebook, laptop, raspberry pi, o que seja.

Uma busca simples na web pode te ajudar a instalar o docker de maneira simples, não esqueça de também instalar o docker-compose.

1 - Pegue o código atualizado através do git, ou faça o download manual:

```bash
git clone https://github.com/glaucius/web-monitor-docker-grafana-influx-db-telegraf-k6.git
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

Este deploy já esta configurado com o datasource padrão apontando para o InfluxDB.


5 - Você também pode criar novas bases no InfluxDB e criar novos datasources no Grafana, abaixo os dados para a conexão com o InfluxDB, lembre-se que estamos falando de uma rede gerenciada pelo Docker, então você pode usar o nome do serviço do Influxdb setado no docker-compose.yml.

	- Url : http://influxdb:8086/
	- User e senha configuradas no config.env
	- Nome do banco influx

6 - Agora instale os dashboards para a monitoração web, assim você coleta e plota em tempo real os dados de performance e disponibilidade:

![Grafana-InfluxD](./screen.png?raw=true "Grafana-InfluxDB")

Este gráfico já esta instalado e configurado para monitorar alguns sites, veja no arquivo de configuração do Telegraf.

- dashboard do grafana para estatisticas web :  https://grafana.com/grafana/dashboards/11777

7 - Agora para o K6, realizar um teste mais preciso e com simulação de muito consumo e usuários simultâneos:

Para as configurações do K6 você deve configurar os scripts em 'scripts/*' , estou fazendo um teste contra o site do Kernel Linux e com duas Urls, a /pub e a de documentações do Kernel.

Depois de configurado e alterado, você roda o K6 como abaixo

```bash
docker-compose run -v $(pwd)/scripts:/scripts k6 run -o influxdb=http://influxdb:8086/myk6db /scripts/http_get.js
```
O resultado é o feedback do K6, como abaixo:

![K6](./k6.png?raw=true "K6")

Uma vez o processo do K6 rodado, você pode checar os resultados no Grafana com o dashboard específico e com o datasource correto, veja no comando acima que o nome do banco é 'myk6db', então use este banco para criar o novo datasource e depois apontar o datasource para o dashboard.

O dashboard que estou usando é este aqui -> https://grafana.com/grafana/dashboards/2587

Olha que bonito:

![K6-Grafana](./k6-grafana.png?raw=true "K6-Grafana")

Seja feliz !!!

Qualquer problema envia um email glaucius@gmail.com

Abs


