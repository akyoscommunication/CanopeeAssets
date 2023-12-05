<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('icon-text', 'components/icon-text.html.twig')]
final class IconTextComponent
{
    public ?string $ico = null;
}
