<?php

namespace Akyos\CanopeeAssets\Twig\Components;

use App\Form\App\ImpersonateType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\UX\LiveComponent\ComponentWithFormTrait;
use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent(name: 'impersonate', template: '@CanopeeAssets/components/impersonate.html.twig')]
final class ImpersonateComponent extends AbstractController
{
    use ComponentWithFormTrait;

    protected function instantiateForm(): FormInterface
    {
        return $this->createForm(ImpersonateType::class, null, [
            'action' => $this->generateUrl('app.dashboard.index'),
            'method' => 'GET',
        ]);
    }
}
