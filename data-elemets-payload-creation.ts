
interface DataElementInterface {
  name: string;
  shortName: string;
  code: string;
  valueType: string;
  aggregationType: string;
  domainType: string;
}

function createDataElementsPayload(subSections: LocalInstanceTemplateInterface['sections']): DataElementInterface[] {
  let dataElements: DataElementInterface[] = [];

  subSections.forEach((subsection) => {
    subsection.indicators.forEach((indicator) => {
      const dataElement: DataElementInterface = {
        name: indicator.name,
        shortName: indicator.code,
        code: indicator.code,
        valueType: 'NUMBER', // Default value type
        aggregationType: 'SUM', // Default aggregation type
        domainType: 'AGGREGATE' // Default domain type
      };

      if (indicator.indicatorType === 'PERCENTAGE') {
        dataElement.valueType = 'PERCENTAGE';
      }

      if (indicator.formula) {
        dataElement.valueType = 'CALCULATED_VALUE';
      }

      if (indicator.numerator && indicator.denominator) {
        dataElement.aggregationType = 'RATIO';
        dataElement.domainType = 'AGGREGATE';
      }

      dataElements.push(dataElement);
    });
  });

  return dataElements;
}

// Usage example
const localInstance: LocalInstanceTemplateInterface = { /* ... */ };

const dataElementsPayload = createDataElementsPayload(localInstance.sections);
console.log(dataElementsPayload);
