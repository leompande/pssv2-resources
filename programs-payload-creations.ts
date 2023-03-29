import axios from "axios";

const DHIS2_BASE_URL = "https://your-dhis2-instance.com/api";
const DHIS2_USERNAME = "your-username";
const DHIS2_PASSWORD = "your-password";

const template_program_name = "Example Template Program";

async function createProgramFromTemplate(program_name: string) {
  const template_program = await getProgramByName(template_program_name);

  if (template_program) {
    const data_elements = extractDataElements(template_program);

    const new_program = {
      uid: generateUid(),
      name: program_name,
      description: template_program.description,
      version: template_program.version,
      yearPublished: template_program.yearPublished,
      sections: template_program.sections,
      isPublished: false,
      createdAt: new Date(),
      publishedAt: null,
      centralInstance: {
        uid: template_program.centralInstance.uid,
        version: template_program.centralInstance.version,
        createdAt: template_program.centralInstance.createdAt
      }
    };

    createProgram(new_program);
  } else {
    console.error("Template program not found");
  }
}

async function getProgramByName(program_name: string) {
  const url = `${DHIS2_BASE_URL}/programs.json?filter=name:eq:${program_name}`;
  const headers = {
    "Content-Type": "application/json"
  };
  const auth = {
    username: DHIS2_USERNAME,
    password: DHIS2_PASSWORD
  };

  try {
    const response = await axios.get(url, {
      headers,
      auth
    });

    if (response.data.programs.length > 0) {
      return response.data.programs[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving program:", error);
    return null;
  }
}

function extractDataElements(program: any) {
  let data_elements = [];

  program.sections.forEach((section: any) => {
    section.subSections.forEach((sub_section: any) => {
      sub_section.indicators.forEach((indicator: any) => {
        indicator.dataElements.forEach((data_element: any) => {
          data_elements.push(data_element);
        });
      });
    });
  });

  return data_elements;
}

async function createProgram(program: any) {
  const url = `${DHIS2_BASE_URL}/programs`;
  const payload = program;
  const headers = {
    "Content-Type": "application/json"
  };
  const auth = {
    username: DHIS2_USERNAME,
    password: DHIS2_PASSWORD
  };

  try {
    const response = await axios.post(url, payload, {
      headers,
      auth
    });

    console.log("Program created:", response.data);
  } catch (error) {
    console.error("Error creating program:", error);
  }
}

function generateUid() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

createProgramFromTemplate("Example Program");
