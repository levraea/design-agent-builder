
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonaFormData {
  product: string;
  targetAudience: string;
  businessGoal: string;
  specialTraits: string;
}

interface PersonaFormFieldsProps {
  formData: PersonaFormData;
  onFormDataChange: (field: keyof PersonaFormData, value: string) => void;
}

export const PersonaFormFields = ({ formData, onFormDataChange }: PersonaFormFieldsProps) => {
  return (
    <>
      <div>
        <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
          What product/service are you building personas for? *
        </label>
        <Input
          id="product"
          value={formData.product}
          onChange={(e) => onFormDataChange('product', e.target.value)}
          placeholder="e.g., Digital health platform for chronic disease management, new crop protection solution, or consumer pain relief product"
          required
        />
      </div>

      <div>
        <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-2">
          Who is your primary target audience? *
        </label>
        <Textarea
          id="audience"
          value={formData.targetAudience}
          onChange={(e) => onFormDataChange('targetAudience', e.target.value)}
          placeholder="e.g., Healthcare providers in primary care, farmers managing 500+ acres, or consumers aged 25-45 seeking wellness solutions"
          className="min-h-[80px]"
          required
        />
      </div>

      <div>
        <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-2">
          What's your main business goal? *
        </label>
        <Select 
          value={formData.businessGoal} 
          onValueChange={(value) => onFormDataChange('businessGoal', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your primary business goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="improve-employee-experience">Improve Employee Experience</SelectItem>
            <SelectItem value="enhance-internal-processes">Enhance Internal Processes</SelectItem>
            <SelectItem value="drive-innovation">Drive Innovation & R&D</SelectItem>
            <SelectItem value="strengthen-compliance">Strengthen Compliance & Safety</SelectItem>
            <SelectItem value="optimize-operations">Optimize Operations & Efficiency</SelectItem>
            <SelectItem value="improve-collaboration">Improve Cross-Team Collaboration</SelectItem>
            <SelectItem value="accelerate-decision-making">Accelerate Decision Making</SelectItem>
            <SelectItem value="enhance-training">Enhance Training & Development</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="traits" className="block text-sm font-medium text-gray-700 mb-2">
          Any specific traits or behaviors you want emphasized? (optional)
        </label>
        <Textarea
          id="traits"
          value={formData.specialTraits}
          onChange={(e) => onFormDataChange('specialTraits', e.target.value)}
          placeholder="e.g., Values scientific evidence and regulatory compliance, cost-conscious decision making, prefers digital solutions that integrate with existing workflows"
          className="min-h-[80px]"
        />
      </div>
    </>
  );
};
