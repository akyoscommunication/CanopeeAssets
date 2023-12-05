<?php

namespace Akyos\CanopeeAssets\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

// TODO: faire un objet stat pour le donner directement à ce composant là ? Réutiliser cette class pour faire les calculs et les afficher dans le composant sans se poser de question
#[AsTwigComponent('stat', template: '@CanopeeAssets/components/stat.html.twig')]
final class StatComponent
{
    public ?string $ico = null;
    public ?string $value = null;
    public ?string $title = null;
    public ?bool $isIncreased = null;
    public ?string $increasedValue = null;
}
