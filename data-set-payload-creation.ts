interface DatasetInterface {
  name: string;
  shortName: string;
  code: string;
  periodType: string;
  categoryCombo: {
    id: string;
  };
  sections: {
    name: string;
    dataSetElements: {
      dataElement: {
        id: string;
      };
      categoryCombo: {
        id: string;
      };
      isCompulsory: boolean;
    }[];
  }[];
}

function createDatasetPayload(localInstance: LocalInstanceTemplateInterface): DatasetInterface {
  const dataset: DatasetInterface = {
    name: localInstance.name,
    shortName: localInstance.name,
    code: localInstance.uid,
    periodType: 'Monthly', // Default period type
    categoryCombo: {
      id: 'default'
    },
    sections: []
  };

  localInstance.sections.forEach((section) => {
    const sectionDataElements: {
      dataElement: {
        id: string;
      };
      categoryCombo: {
        id: string;
      };
      isCompulsory: boolean;
    }[] = [];

    section.subSections.forEach((subsection) => {
      subsection.indicators.forEach((indicator) => {
        indicator.dataElements.forEach((dataElement) => {
          sectionDataElements.push({
            dataElement: {
              id: dataElement.uid
            },
            categoryCombo: {
              id: 'default'
            },
            isCompulsory: false // Default value for isCompulsory
          });
        });
      });
    });

    dataset.sections.push({
      name: section.name,
      dataSetElements: sectionDataElements
    });
  });

  return dataset;
}

// Usage example
const localInstance: LocalInstanceTemplateInterface = { /* ... */ };

const datasetPayload = createDatasetPayload(localInstance);
console.log(datasetPayload);
