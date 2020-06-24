import * as core from '@actions/core'
import * as azdev from "azure-devops-node-api";
import * as witapi from "azure-devops-node-api/WorkItemTrackingApi";
import * as witi from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import {wait} from './wait'
import { JsonPatchDocument } from 'azure-devops-node-api/interfaces/common/VSSInterfaces';

async function run(): Promise<void> {
  try {
    const myInput: string = core.getInput('myInput')
    core.debug(`Hello ${myInput}  ...`)
    console.log("Hello " + myInput)


    // connect to AzD
    let orgUrl = "https://dev.azure.com/AzureDevOpsDemo-a";
    let token:  string = "ppbs6zhmq5xtupvumfvxcx4qjbh7dxkro72tew5ia6na53lhmppq";
    let authHandler = azdev.getPersonalAccessTokenHandler(token); 
    let connection = new azdev.WebApi(orgUrl, authHandler); 
    console.log("got connection:" + connection);

    // get work item tracking for project ADOELPDemo
    let wit: witapi.IWorkItemTrackingApi = await connection.getWorkItemTrackingApi()
    console.log("got wit:" + wit);


    let project: string = "ADOELPDemo";
    let workitemType: string = "PR"
    let createWorkItemJson: JsonPatchDocument = [
      {
        "op": "add",
        "path": "/fields/System.Title", 
        "from": null, 
        "value": "PR FROM MY ACTION!!!!" 
      },
      {
        "op": "add",
        "path": "/fields/System.IterationPath", 
        "from": null, 
        "value": "ADOELPDemo\\Sprint 1"
      }
    ];
    console.log('trying to create work item');
    wit.createWorkItem({}, createWorkItemJson, project, workitemType, false, false, false, witi.WorkItemExpand.None )
    console.log('created work item');

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
