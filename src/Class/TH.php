<?php

namespace Akyos\CanopeeAssets\Class;

class TH
{
	public string $name;
	public ?string $sort = null;

	public function __construct(string $name, string $sort = null)
	{
		$this->name = $name;
		$this->sort = $sort;
	}
}
