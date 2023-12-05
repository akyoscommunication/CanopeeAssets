<?php

namespace Akyos\CanopeeAssets\DependencyInjection;

use Exception;
use Symfony\Component\Config\Definition\ConfigurationInterface;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class CanopeeAssetsExtension extends Extension
{
    public function load(array $configs, ContainerBuilder $container): void
    {
        /** @var ConfigurationInterface $configuration */
        $configuration = $this->getConfiguration($configs, $container);
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config'));
        try {
            $loader->load('services.yaml');
        } catch (Exception $e) {
//            dd($e);
        }

        foreach ($config as $key => $value) {
            $container->setParameter($key, $value);
        }
    }
}
