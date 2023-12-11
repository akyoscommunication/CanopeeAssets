<?php

namespace Akyos\CanopeeAssets\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SwitchType extends AbstractType
{
    public function finishView(FormView $view, FormInterface $form, array $options): void
    {
        $view->vars['multiple'] = true;
    }

    public function getParent(): string
    {
        return CheckboxType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'switch';
    }
}
