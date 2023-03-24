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
      indicator.dataElements.forEach((dataElement) => {
        const newElement: DataElementInterface = {
          name: dataElement.name,
          shortName: dataElement.code,
          code: dataElement.code,
          valueType: dataElement.dataType,
          aggregationType: 'SUM', // Default aggregation type
          domainType: 'AGGREGATE' // Default domain type
        };

        dataElements.push(newElement);
      });
    });
  });

  return dataElements;
}

// Usage example
const localInstance: LocalInstanceTemplateInterface = { /* ... */ };

const dataElementsPayload = createDataElementsPayload(localInstance.sections);
console.log(dataElementsPayload);
