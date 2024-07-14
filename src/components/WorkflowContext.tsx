import React, { createContext, Reducer, useReducer } from "react";
import { WorkflowStep } from "../utils/workflow";

const initialWorkflow: Workflow = {
    step: WorkflowStep.NEW_SONG,
    isStarted: false,
    areDrumsEnabled: false,
    areChordsEnabled: false,
    isMelodyEnabled: false,
}

export const WorkflowContext = createContext(initialWorkflow);

export const WorkflowDispatchContext = createContext<React.Dispatch<WorkflowAction> | null>(null);

function workflowReducer(workflow: Workflow, action: WorkflowAction) {
    switch (action.type) {
        case "setStep": {
            const areDrumsEnabled = action.step === WorkflowStep.DRUMS ? true : workflow.areDrumsEnabled
            const areChordsEnabled = action.step === WorkflowStep.CHORDS ? true : workflow.areChordsEnabled
            const isMelodyEnabled = action.step === WorkflowStep.MELODY ? true : workflow.isMelodyEnabled
            return {
                ...workflow,
                areDrumsEnabled,
                areChordsEnabled,
                isMelodyEnabled,
                step: action.step,
            }
        }
        case "start":
            return { ...workflow, isStarted: true }
        default:
            return workflow
    }
}

type Workflow = {
    step: WorkflowStep
    isStarted: boolean
    areDrumsEnabled: boolean
    areChordsEnabled: boolean
    isMelodyEnabled: boolean
}

type WorkflowAction = {
    type: "setStep"
    step: WorkflowStep
} | {
    type: "start"
}

export const WorkflowProvider = ({ children }: { children: React.ReactNode }) => {
    const [workflow, dispatch] = useReducer<Reducer<Workflow, WorkflowAction>>(
        workflowReducer,
        initialWorkflow
    )

    return (
        <WorkflowContext.Provider value={workflow}>
            <WorkflowDispatchContext.Provider value={dispatch}>
                {children}
            </WorkflowDispatchContext.Provider>
        </WorkflowContext.Provider>
    )
}