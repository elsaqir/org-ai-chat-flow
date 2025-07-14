import { Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
      className={cn(
        "group p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 border backdrop-blur-sm",
        isSelected 
          ? 'border-orange-300 shadow-lg shadow-orange-500/20 bg-gradient-to-br from-orange-50 to-orange-100/50 ring-1 ring-orange-200' 
          : 'border-gray-200/60 hover:border-gray-300/80 bg-white/60 hover:bg-white/80'
      )}
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