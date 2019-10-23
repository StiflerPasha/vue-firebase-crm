export default {
   bind(el, { value }) {
      console.log(value)
      M.Tooltip.init(el, { html: value.text, position: value.position || 'bottom' })
   },
   unbind(el) {
      const tooltip = M.Tooltip.getInstance(el)

      if (tooltip && tooltip.destroy) {
         tooltip.destroy()
      }
   }
}