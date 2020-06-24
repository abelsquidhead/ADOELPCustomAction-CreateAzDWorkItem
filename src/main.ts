import * as core from '@actions/core'
import * as github from '@actions/github'
import * as azdev from "azure-devops-node-api";
import * as witapi from "azure-devops-node-api/WorkItemTrackingApi";
import * as witi from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";
import {wait} from './wait'
import { JsonPatchDocument } from 'azure-devops-node-api/interfaces/common/VSSInterfaces';

async function run(): Promise<void> {
  try {

    // get input values
    const myInput: string = core.getInput('myInput');
    const myToken = core.getInput('myToken');
    core.debug(`Hello ${myInput}  ...`);
    console.log("myInput: " + myInput);
    console.log("myToken: " + myToken);

    // get reference to octokit
    const octokit = github.getOctokit(myToken);

    // get reference to current context
    const context = github.context;
    const prUrl = context.payload.pull_request?.html_url;
    const prBody = context.payload.pull_request?.body;
    
    const eventName = context.eventName;
    const workflow = context.workflow;
    const action = context.payload.action;
    const comment = context.payload.comment;
    const installation = context.payload.installation;
    const issue = context.payload.issue;
    const pullrequest = context.payload.pull_request;
    const repository = context.payload.repository;
    const sender = context.payload.sender;

    console.log("prUrl: " + prUrl);
    console.log("prBody: " + prBody);
    console.log("workflow:" + workflow);

    console.log("eventName:" + eventName);
    console.log("workflow:" + workflow);
    console.log("action:" + action);
    console.log("comment:" + comment);
    console.log("installation:" + installation);
    console.log("issue:" + issue);
    console.log("pullrequest:" + pullrequest);
    console.log("repository:" + repository);
    console.log("sender:" + sender);

    // connect to AzD
    let orgUrl = "https://dev.azure.com/AzureDevOpsDemo-a";
    let token:  string = "ppbs6zhmq5xtupvumfvxcx4qjbh7dxkro72tew5ia6na53lhmppq";
    let authHandler = azdev.getPersonalAccessTokenHandler(token); 
    let connection = new azdev.WebApi(orgUrl, authHandler); 
    console.log("got connection:" + connection);

    // get work item tracking for projemct ADOELPDemo
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
      },
      {
        "op": "add",
        "path": "/fields/System.State", 
        "from": null, 
        "value": "Approved"
      },
      {
        "op": "add",
        "path": "/fields/WEF_55FBA321D976426486844EECE72D33D4_Kanban.Lane", 
        "from": null, 
        "value": "PR"
      }
    ];
    console.log('trying to create work item');
    wit.createWorkItem({}, createWorkItemJson, project, workitemType, false, true, false, witi.WorkItemExpand.None )
    console.log('created work item');

  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
