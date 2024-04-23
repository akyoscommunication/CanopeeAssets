<?php

namespace Akyos\CanopeeAssets\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('icon-text', '@CanopeeAssets/components/icon-text.html.twig')]
final class IconTextComponent
{
    public ?string $ico = null;
    public ?string $uxIco = null;
    public ?string $uxIcoClasses = null;

    public bool $icoOnly = false;
}
