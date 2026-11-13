import {bindingHelp,bindingLabel,type Binding} from '../../../shared/binding';

// Estado de vínculo do exemplar (comércio limitado, shared/binding.ts). Item livre não mostra nada.
export default function BindingTag({item}:{item:Partial<Binding>}){
  const label=bindingLabel(item);
  return label?<span className={`binding-tag ${item.bound?'bound':'on-equip'}`} title={bindingHelp(item)}>{label}</span>:null;
}
