import { FlowXSheet } from '../overlays/flowx-sheet';

/**
 * <flowx-drawer>
 *
 * Off-canvas drawer panel. Aliased to Tier 6's <flowx-sheet> implementation.
 */
export class FlowXDrawer extends FlowXSheet {}

if (!customElements.get('flowx-drawer')) {
  customElements.define('flowx-drawer', FlowXDrawer);
}
