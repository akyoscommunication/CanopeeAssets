<?php

namespace App\Controller\App\Collaborator\Components\elements;

use App\Entity\User;
use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent(name: 'collaborator_card', template: '@CanopeeAssets/components/collaborator/card.html.twig')]
final class CollaboratorCardComponent
{
    public User $collaborator;

    public ?string $tag = 'a';
}
