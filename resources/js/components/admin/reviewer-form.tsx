import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';

type ReviewerFormData = {
  name: string;
  email: string;
  role: string;
};

type ReviewerFormProps = {
  data: ReviewerFormData;
  onChange: (field: keyof ReviewerFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEditing?: boolean;
};

const registeredUsers = [
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' },
  { name: 'Mike Johnson', email: 'mike.johnson@example.com' },
  { name: 'Sarah Wilson', email: 'sarah.wilson@example.com' },
  { name: 'David Brown', email: 'david.brown@example.com' },
  { name: 'Alice Cooper', email: 'alice.cooper@example.com' },
  { name: 'Bob Martin', email: 'bob.martin@example.com' },
  { name: 'Carol White', email: 'carol.white@example.com' },
  { name: 'Daniel Green', email: 'daniel.green@example.com' },
  { name: 'Emma Davis', email: 'emma.davis@example.com' },
];

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'reviewer', label: 'Reviewer' }
];

export function ReviewerForm({ data, onChange, onSubmit, isEditing = false }: ReviewerFormProps) {
  const [nameOpen, setNameOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);

  const handleNameChange = (selectedName: string) => {
    const selectedUser = registeredUsers.find(user => user.name === selectedName);
    if (selectedUser) {
      onChange('name', selectedUser.name);
      onChange('email', selectedUser.email);
    }
    setNameOpen(false);
  };

  const handleEmailChange = (selectedEmail: string) => {
    const selectedUser = registeredUsers.find(user => user.email === selectedEmail);
    if (selectedUser) {
      onChange('name', selectedUser.name);
      onChange('email', selectedUser.email);
    }
    setEmailOpen(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <Popover open={nameOpen} onOpenChange={setNameOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={nameOpen}
              className="w-full justify-between"
              disabled={isEditing}
            >
              {data.name || "Select a name..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search names..." />
              <CommandEmpty>No name found.</CommandEmpty>
              <CommandGroup>
                {registeredUsers.map((user) => (
                  <CommandItem
                    key={user.name}
                    value={user.name}
                    onSelect={() => handleNameChange(user.name)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        data.name === user.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {user.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <Popover open={emailOpen} onOpenChange={setEmailOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={emailOpen}
              className="w-full justify-between"
              disabled={isEditing}
            >
              {data.email || "Select an email..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search emails..." />
              <CommandEmpty>No email found.</CommandEmpty>
              <CommandGroup>
                {registeredUsers.map((user) => (
                  <CommandItem
                    key={user.email}
                    value={user.email}
                    onSelect={() => handleEmailChange(user.email)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        data.email === user.email ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {user.email}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Function Role</label>
        <Select value={data.role} onValueChange={(value) => onChange('role', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Save Reviewer</Button>
    </form>
  );
}