import localizeFilter from '../filters/localize.filter';

export default {
  bind(el, { value, modifiers }) {
    M.Tooltip.init(el, {
      html: modifiers.nolocale ? value.text : localizeFilter(value.text),
      position: value.position || 'left',
    });
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el);
    
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
