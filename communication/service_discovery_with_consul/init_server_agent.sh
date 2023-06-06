mkdir /etc/consul.d
mkdir /var/lib/consul
ifconfig
consul agent -server -bootstrap-expect=3 -node= -bind= -data-dir=/var/lib/consul -config-dir=/etc/consul.d
consul join 172.19.0.2