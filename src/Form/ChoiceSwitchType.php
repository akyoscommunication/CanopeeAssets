<?php

namespace Akyos\CanopeeAssets\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Form\FormView;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ChoiceSwitchType extends AbstractType
{
    public function finishView(FormView $view, FormInterface $form, array $options): void
    {
        foreach ($view->children as $child) {
            $child->vars['block_prefixes'] = array_merge($child->vars['block_prefixes'], ['switch']);
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'expanded' => true,
        ]);
    }

    public function getParent(): string
    {
        return ChoiceType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'choice_switch';
    }
}
