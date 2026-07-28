/**
 * Context detail payload dispatched with FlowX lifecycle events.
 */
interface FlowXEventDetail {
    /** The element triggering the AJAX/swapping lifecycle. */
    element: HTMLElement;
    /** The DOM target node where swapped content will be inserted. */
    target?: HTMLElement;
    /** The raw URL endpoint queried during the AJAX operation. */
    request?: string;
    /** The fetch HTTP Response object returned from the mock or live server. */
    xhr?: Response;
    /** The error instance captured if the request fails. */
    error?: any;
}
/**
 * Public API surface of the FlowX runtime instance passed to extension `init` callbacks.
 */
interface FlowXInstance {
    /** Scans and attaches FlowX behaviour to all matching elements within the given root. */
    process(root?: Element | Document): void;
    /** Registers a FlowX extension with the runtime. */
    addExtension(extension: FlowXExtension): void;
}
/**
 * Interface definition for registering custom FlowX middleware/extensions.
 */
interface FlowXExtension {
    /** Uniquely identifies the extension. */
    name: string;
    /** Triggered prior to dispatching the request. Return false to cancel the operation. */
    beforeRequest?: (detail: FlowXEventDetail) => boolean | void;
    /** Triggered after content is swapped into the target node. */
    afterSwap?: (detail: FlowXEventDetail) => void;
    /** Triggered when the AJAX request throws an error or fails. */
    onError?: (detail: FlowXEventDetail) => void;
    /** Runs upon addition to initialize custom configurations on the runtime. */
    init?: (flowX: FlowXInstance) => void;
}
/**
 * Main FlowX framework API object.
 */
declare const FlowX: {
    /**
     * Initializes the FlowX engine. Scans the document.body for interactive elements and
     * sets up a MutationObserver to automatically initialize newly added DOM elements.
     */
    init(): void;
    /**
     * Manually processes a specific DOM sub-tree to bind FlowX event handlers.
     * @param root The root element or document fragment to scan.
     */
    process(root?: Element | Document): void;
    /**
     * Performs an asynchronous AJAX call using FlowX's request and swap engine.
     * @param method The HTTP request verb (e.g. GET, POST, PUT, DELETE).
     * @param url The endpoint URL to query.
     * @param options Execution configurations including triggering element, custom target, swap style, and values.
     */
    ajax(method: string, url: string, options?: {
        element?: HTMLElement;
        target?: HTMLElement;
        swap?: string;
        values?: Record<string, any>;
    }): Promise<void>;
    /**
     * Registers a middleware extension to tap into request lifecycle hooks.
     * @param extension The extension definition containing hooks.
     */
    addExtension(extension: FlowXExtension): void;
    /**
     * Removes a registered extension by its name identifier.
     * @param name The unique name of the extension to remove.
     */
    removeExtension(name: string): void;
};

export { FlowX, type FlowXEventDetail, type FlowXExtension, type FlowXInstance };
