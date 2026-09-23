
import { Page, Locator, expect } from '@playwright/test';

export class InviteTeamPage {
    readonly page: Page;
    readonly agencyTab: Locator;
    readonly inviteMenuItem: Locator;
    readonly headingInviteYourTeam: Locator;
    readonly subHeadingInviteDesc: Locator;
    readonly subHeadingContactInfo: Locator;
    readonly paragraphInviteDesc: Locator;
    readonly fieldLabels: Locator;
    readonly avatarInitials: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly nextButton: Locator;
    readonly roleButton: (role: string) => Locator;
    readonly confirmDetailsHeading: Locator;
    readonly profileSection: Locator;
    readonly sendButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.agencyTab = page.locator('span.nav-link-text.ms-1').nth(4);
        this.inviteMenuItem = page.locator('a[href="/invite"]');
        this.headingInviteYourTeam = page.locator('h3.mt-5.text-white');
        this.subHeadingInviteDesc = page.locator('h5.text-white.font-weight-normal');
        this.subHeadingContactInfo = page.locator('h5.font-weight-normal').nth(1);
        this.paragraphInviteDesc = page.locator('p').nth(0);
        this.fieldLabels = page.locator('div.mt-4.col-12.col-sm-8 label');
        this.avatarInitials = page.locator('div.avatar-initials');
        this.firstNameField = page.locator('input.mb-3').nth(0);
        this.lastNameField = page.locator('input.mb-3').nth(1);
        this.emailField = page.locator('input[type="email"]').nth(0);
        this.nextButton = page.getByRole('button', { name: 'Next' });
        this.roleButton = (role: string) =>
            page.locator('button.px-6.py-5.btn.btn-lg h6', { hasText: role });
        this.confirmDetailsHeading = page.locator('h5.font-weight-normal').nth(2);
        this.profileSection = page.locator('div.col-12');
        this.sendButton = page.getByRole('button', { name: 'Send' });
    }

    async navigateToInvitePage() {
        await this.agencyTab.click();
        await this.inviteMenuItem.click();
    }

    async verifyInvitePageUI(fieldLabels: string[]) {
        await expect(this.headingInviteYourTeam).toContainText('Invite Your Team');
        await expect(this.subHeadingInviteDesc).toContainText(
            'This is where you invite producers and managers to join your team.'
        );
        await expect(this.subHeadingContactInfo).toContainText('Contact information');
        await expect(this.paragraphInviteDesc).toContainText(
            'Producer/Admins will receive an email invite to the provided email address.'
        );

        for (const label of fieldLabels) {
            await expect(this.fieldLabels.filter({ hasText: label })).toBeVisible();
        }
    }

    async assertAvatarInitials(initials: string) {
        await expect(this.avatarInitials).toContainText(initials);
    }

    async fillMemberDetails(firstName: string, lastName: string, email: string) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
    }

    async selectRoles(roles: string[]) {
        for (const role of roles) {
            await this.roleButton(role).click();
        }
    }

    async verifyConfirmDetails(firstName: string, lastName: string, email: string) {
        await expect(this.confirmDetailsHeading).toContainText('Confirm their details');
        await expect(this.profileSection.locator(`p:has-text("First Name:")`)).toHaveText(
            `First Name: ${firstName}`
        );
        await expect(this.profileSection.locator(`p:has-text("Last Name:")`)).toHaveText(
            `Last Name: ${lastName}`
        );
        await expect(this.profileSection.locator(`p:has-text("Email:")`)).toHaveText(
            `Email: ${email}`
        );
    }

    async completeInvitationFlow(
        fieldLabels: string[],
        initialAvatar: string,
        firstName: string,
        lastName: string,
        updatedAvatar: string,
        email: string,
        roles: string[]
    ) {
        await this.navigateToInvitePage();
        await this.verifyInvitePageUI(fieldLabels);
        await this.assertAvatarInitials(initialAvatar);
        await this.fillMemberDetails(firstName, lastName, email);
        await this.assertAvatarInitials(updatedAvatar);
        await this.nextButton.click();
        await this.selectRoles(roles);
        await this.nextButton.click();
        await this.verifyConfirmDetails(firstName, lastName, email);
        await this.sendButton.click();
    }
}
