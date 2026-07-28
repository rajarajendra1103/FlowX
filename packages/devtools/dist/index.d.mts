interface LogEntry {
    id: string;
    method: string;
    url: string;
    triggerSelector: string;
    targetSelector: string;
    strategy: string;
    status: 'pending' | 'success' | 'error';
    statusCode?: number;
    duration?: number;
    error?: string;
    timestamp: string;
}
declare const FlowXDevTools: {
    logs: LogEntry[];
    initialized: boolean;
    minimized: boolean;
    visible: boolean;
    init(): void;
    injectStyles(): void;
    createPanel(): void;
    togglePanel(): void;
    toggleMinimize(): void;
    bindEvents(): void;
    bindKeyboardShortcuts(): void;
    render(): void;
};

export { FlowXDevTools };
