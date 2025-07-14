import { Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Organization {
  id: string;
  name: string;
  category: string;
  description: string;
  logo?: string;
  verified: boolean;
}

interface OrganizationCardProps {
  organization: Organization;
  onSelect: (org: Organization) => void;
  isSelected?: boolean;
}

export function OrganizationCard({ organization, onSelect, isSelected }: OrganizationCardProps) {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 border ${
        isSelected 
          ? 'border-primary shadow-lg shadow-orange-500/25 bg-gradient-to-b from-gray-50 to-gray-100' 
          : 'border-border hover:border-gray-300'
      }`}
      onClick={() => onSelect(organization)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {organization.logo ? (
            <img 
              src={organization.logo} 
              alt={`${organization.name} logo`}
              className="w-12 h-12 rounded-xl object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm truncate">
              {organization.name}
            </h3>
            {organization.verified && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                Verified
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-gray-500 mb-2 capitalize">
            {organization.category}
          </p>
          
          <p className="text-xs text-gray-400 line-clamp-2">
            {organization.description}
          </p>
        </div>
      </div>
    </Card>
  );
}