import React from "react"
import { Card, CardContent, Typography } from "@material-ui/core"


const sdg = {
    "id": "bahmni",
    "name": "Bahmni",
    "description": "Open Source Comprehensive Electronic Medical Record System built on top of OpenMRS, OpenELIS and OpenERP",
    "website": "https://www.bahmni.org",
    "license": [
      {
        "spdx": "AGPL-3.0",
        "licenseURL": "https://www.bahmni.org/license"
      }
    ],
    "SDGs": [
      {
        "SDGNumber": 3,
        "evidenceText": "Over 500 implementations across 50 countries - predominantly in Africa and Asia. Millions of patients across the world have benefited from Bahmni as their stretched doctors and caregivers have used the system to track and monitor patient health and records. The endTB project that tested the latest anti-biotics (Bedqualine and Delamanid) was run on Bahmni."
      },
      {
        "SDGNumber": 10,
        "evidenceText": "Over 500 implementations across 50 countries - predominantly in Africa and Asia. Millions of patients across the world have benefited from Bahmni as their stretched doctors and caregivers have used the system to track and monitor patient health and records. The endTB project that tested the latest anti-biotics (Bedqualine and Delamanid) was run on Bahmni."
      },
      {
        "SDGNumber": 17,
        "evidenceText": "Over 500 implementations across 50 countries - predominantly in Africa and Asia. Millions of patients across the world have benefited from Bahmni as their stretched doctors and caregivers have used the system to track and monitor patient health and records. The endTB project that tested the latest anti-biotics (Bedqualine and Delamanid) was run on Bahmni."
      }
    ],
    "sectors": [
      "Health"
    ],
    "type": [
      "software"
    ],
    "repositoryURL": "https://github.com/Bahmni/bahmni-core",
    "organizations": [
      {
        "name": "Bahmni",
        "website": "https://bahmni.org",
        "org_type": "owner"
      }
    ],
    "stage": "DPG",
    "locations": {
        "developmentCountries": [
          "India",
          "USA"
        ],
        "deploymentCountries": [
          "India",
          "Lesotho",
          "Cambodia",
          "Nepal",
          "Bangladesh",
          "Bhutan",
          "Sierra Leone",
          "Uganda",
          "Pakistan",
          "Indonesia",
          "South Africa",
          "Kenya",
          "Ethiopia",
          "Philippines",
          "Haiti",
          "Zambia",
          "Papua New Guinea",
          "Jordan",
          "Republic of Congo",
          "Iraq",
          "Malawi",
          "Belarus",
          "Myanmar",
          "Mozambique",
          "eSwatini (former Swaziland)",
          "Armenia",
          "Georgia",
          "Kyrgyzstan",
          "Ukraine",
          "Zimbabwe"
        ]
      }
  }
  //sdg.SDGs.map(element => {
    // console.log(element[0].SDGNumber)})


function Test() {
    return (
        <div className="App">
            <div>{sdg.SDGs.map(element => {
                return <div>SDG Number : {element.SDGNumber}</div>
            })}</div>
            <Card className = "infoBox">
            <CardContent>
                 <Typography color="textSecondary">{sdg.SDGs.map(element => {
                return <div>SDG Number : {element.SDGNumber}</div>
            })}</Typography>
            </CardContent>
        </Card>
        </div>
      );
}

export default Test;
      

