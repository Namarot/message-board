# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "hashicorp/bionic64"
  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.network :forwarded_port, guest: 8080, host: 9000
  config.vm.network :forwarded_port, guest: 8081, host: 9001
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "main.yml"
  end

end