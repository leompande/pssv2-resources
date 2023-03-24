interface IndicatorInterface {
  name: string;
  shortName: string;
  code: string;
  numerator: string;
  denominator: string;
  numeratorDescription?: string;
  denominatorDescription?: string;
  description: string;
  indicatorType: string;
  formula?: string;
}

function createIndicatorsPayload(subSections: LocalInstanceTemplateInterface['sections']): IndicatorInterface[] {
  let indicators: IndicatorInterface[] = [];

  subSections.forEach((subsection) => {
    subsection.indicators.forEach((indicator) => {
      const newIndicator: IndicatorInterface = {
        name: indicator.name,
        shortName: indicator.code,
        code: indicator.code,
        numerator: indicator.numerator,
        denominator: indicator.denominator,
        numeratorDescription: indicator.numeratorDescription,
        denominatorDescription: indicator.denominatorDescription,
        description: indicator.description,
        indicatorType: indicator.indicatorType,
        formula: indicator.formula
      };

      indicators.push(newIndicator);
    });
  });

  return indicators;
}

// Usage example
const localInstance: LocalInstanceTemplateInterface = { /* ... */ };

const indicatorsPayload = createIndicatorsPayload(localInstance.sections);
console.log(indicatorsPayload);
