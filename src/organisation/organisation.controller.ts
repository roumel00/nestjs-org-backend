import { Controller } from '@nestjs/common';
import { OrganisationService } from './organisation.service.js';

@Controller('organisations')
export class OrganisationController {
  constructor(private readonly organisationService: OrganisationService) {}
}
