mkdir /etc/consul.d
mkdir /var/lib/consul
ifconfig
consul agent -bind=172.19.0.5 -data-dir=/var/lib/consul -config-dir=/etc/consul.d