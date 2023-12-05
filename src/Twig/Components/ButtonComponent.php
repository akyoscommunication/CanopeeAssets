<?php

namespace App\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('button', template: 'components/button.html.twig')]
final class ButtonComponent
{
    public string $tag = 'a';
    public ?string $ico = null;
    public string $appearance = 'primary';
    public string $btn_style = 'default';
    public bool $only_ico = false;
}
