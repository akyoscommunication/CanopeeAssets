<?php

namespace Akyos\CanopeeAssets\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent('chart-legend', template: '@CanopeeAssets/components/chart-legend.html.twig')]
final class ChartLegendComponent
{
	public array $labels = [];

	public array $redirect = [];
}
