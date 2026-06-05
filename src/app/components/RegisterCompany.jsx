"use client";

import { Factory, Globe, LocationArrow, Picture } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";

export function RegisterCompany() {
  return (
    <Modal>
      <Button
        className="bg-white text-black font-semibold px-7 h-11 rounded-xl hover:bg-white/90 transition-colors"
        variant="ghost"
      >
        Register New Company
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-gray-600 text-white">
                <Factory className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Register New Company</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Enter your business details to start hiring on HireLoop.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">

                  {/* Row 1: Company Name + Industry */}
                  <div className="grid grid-cols-2 gap-3">
                    <TextField className="w-full" name="companyName" type="text" variant="secondary">
                      <Label>Company Name</Label>
                      <Input placeholder="e.g. Acme Corp" />
                    </TextField>

                    <Select className="w-full" placeholder="Technology" name="industry">
                      <Label>Industry / Category</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="technology" textValue="Technology">
                            Technology
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="finance" textValue="Finance">
                            Finance
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="healthcare" textValue="Healthcare">
                            Healthcare
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="education" textValue="Education">
                            Education
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="retail" textValue="Retail">
                            Retail
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="manufacturing" textValue="Manufacturing">
                            Manufacturing
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="media" textValue="Media & Entertainment">
                            Media & Entertainment
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="other" textValue="Other">
                            Other
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Row 2: Website URL + Location */}
                  <div className="grid grid-cols-2 gap-3">
                    <TextField className="w-full" name="websiteUrl" type="url" variant="secondary">
                      <Label>Website URL</Label>
                      <Input
                        placeholder="www.company.com"
                        prefix={
                          <span className="flex items-center gap-1.5 text-muted text-sm pr-2 border-r border-border">
                            <Globe className="size-3.5" />
                            https://
                          </span>
                        }
                      />
                    </TextField>

                    <TextField className="w-full" name="location" type="text" variant="secondary">
                      <Label>Location</Label>
                      <Input
                        placeholder="City, Country"
                        prefix={<LocationArrow className="size-4 text-muted" />}
                      />
                    </TextField>
                  </div>

                  {/* Row 3: Employee Count + Company Logo URL */}
                  <div className="grid grid-cols-2 gap-3">
                    <Select className="w-full" placeholder="1-10 employees" name="employeeRange">
                      <Label>Employee Count Range</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="1-10" textValue="1-10 employees">
                            1-10 employees
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="11-50" textValue="11-50 employees">
                            11-50 employees
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="51-200" textValue="51-200 employees">
                            51-200 employees
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="201-500" textValue="201-500 employees">
                            201-500 employees
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="501-1000" textValue="501-1000 employees">
                            501-1000 employees
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="1000+" textValue="1000+ employees">
                            1000+ employees
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>

                    <TextField className="w-full" name="logoUrl" type="url" variant="secondary">
                      <Label>Company Logo</Label>
                      <Input
                        placeholder="https://example.com/logo.png"
                        prefix={<Picture className="size-4 text-muted" />}
                      />
                      <p className="text-xs text-muted mt-1">PNG, JPG up to 5MB</p>
                    </TextField>
                  </div>

                  {/* Brief Description */}
                  <TextField className="w-full" name="description" variant="secondary">
                    <Label>Brief Description</Label>
                    <Input
                      placeholder="Tell us about your company's mission and culture..."
                      className="min-h-[88px] items-start pt-2"
                    />
                  </TextField>

                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button
              className={'text-white'}
              slot="close" variant="secondary">
                Cancel
              </Button>
              <Button
              className={'bg-white text-gray-800 font-bold'}
              slot="close">Register Company</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
