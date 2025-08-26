import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { ArrowLeft, Save, X, Plus, Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator';

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'switch' | 'tags';
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface GenericAddEditViewProps {
  title: string;
  description?: string;
  fields: FieldConfig[];
  data?: any;
  isEdit?: boolean;
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function GenericAddEditView({
  title,
  description,
  fields,
  data = {},
  isEdit = false,
  onSave,
  onCancel,
  isLoading = false
}: GenericAddEditViewProps) {
  const [formData, setFormData] = useState<any>(data);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: value
    }));
    
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const handleTagsChange = (fieldName: string, newTag: string) => {
    if (newTag.trim()) {
      const currentTags = formData[fieldName] || [];
      setFormData((prev: any) => ({
        ...prev,
        [fieldName]: [...currentTags, newTag.trim()]
      }));
    }
  };

  const handleTagRemove = (fieldName: string, tagToRemove: string) => {
    const currentTags = formData[fieldName] || [];
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: currentTags.filter((tag: string) => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.name] || '';
    const hasError = !!errors[field.name];

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            id={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={hasError ? 'border-red-500' : ''}
            rows={4}
          />
        );

      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(newValue) => handleFieldChange(field.name, newValue)}
          >
            <SelectTrigger className={hasError ? 'border-red-500' : ''}>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'switch':
        return (
          <Switch
            checked={!!value}
            onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
          />
        );

      case 'tags':
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {(value || []).map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(field.name, tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder={field.placeholder || `Add ${field.label.toLowerCase()}`}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleTagsChange(field.name, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className={hasError ? 'border-red-500' : ''}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  const input = document.querySelector(`input[placeholder*="${field.label.toLowerCase()}"]`) as HTMLInputElement;
                  if (input && input.value.trim()) {
                    handleTagsChange(field.name, input.value);
                    input.value = '';
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <Input
            id={field.name}
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={hasError ? 'border-red-500' : ''}
          />
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {isEdit ? `Edit ${title}` : `Add New ${title}`}
            </h1>
            {description && (
              <p className="text-gray-600 mt-1">{description}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? `Edit ${title}` : `Create New ${title}`}</CardTitle>
          <CardDescription>
            {isEdit 
              ? `Update the information for this ${title.toLowerCase()}`
              : `Enter the details for the new ${title.toLowerCase()}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={field.type === 'textarea' || field.type === 'tags' ? 'md:col-span-2' : ''}
                >
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <div className="mt-2">
                    {renderField(field)}
                  </div>
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}