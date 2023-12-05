<?php

namespace Akyos\CanopeeAssets;

use Akyos\CanopeeAssets\DependencyInjection\CanopeeAssetsExtension;
use Symfony\Component\DependencyInjection\Extension\ExtensionInterface;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class CanopeeAssets extends Bundle
{
    public function getContainerExtension(): ?ExtensionInterface
    {
        if (null === $this->extension) {
            $this->extension = new CanopeeAssetsExtension();
        }
        return $this->extension;
    }
}
