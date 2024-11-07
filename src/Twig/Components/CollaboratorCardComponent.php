<?php

namespace Akyos\CanopeeAssets\Twig\Components;

use App\Entity\UserAccessRight;
use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent(name: 'collaborator_card', template: '@CanopeeAssets/components/collaborator/card.html.twig')]
final class CollaboratorCardComponent
{
    public UserAccessRight $userAccessRight;

    public ?string $tag = 'a';
}
