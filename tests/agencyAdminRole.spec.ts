//Agency Admin Role Spec
import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import testData from '../fixtures/TestData.json';
import MailosaurClient from 'mailosaur';
import { DashboardPage } from '../pages/dashboardPage';
import { InviteTeamPage } from '../pages/agencyAdminRole';
import { completeUserRegistration } from '../pages/registrationPage';
import { getActivationLinkFromMailosaur } from '../pages/commonFunctions';

test('Agency Admin Role - Invite and Register New User Flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const invitePage = new InviteTeamPage(page);

    //Login with Agency Account 
    await loginPage.login('brandon+appletest@royal.it.com', 'testtest');
    await page.waitForURL(/dashboard\/home/);
    await page.click('button.btn.btn-primary');

    const containerHeadings = [
        'Average Consulting Savings',
        'Average Gap Liability',
        'Average Account Premium',
        'Earnings Ratio',
        'Closing Ratio',
        'Presentation Goal (YTD)',
        'Income Goal (YTD)'
    ]

    const navBarHeadings = [
        'Dashboard',
        'Proposals',
        'Goals',
        'Email Marketing (BETA)',
        'Agency',
        'Support'
    ]

    const fieldLabels = [
        'First Name',
        'Last Name',
        'Email Address'
    ]

    const roles = [
        'Producer',
        'Admin',
        'Producer'
    ]

    //Verifying default UI state after login
    await dashboard.verifyContainerHeadings(containerHeadings);
    await dashboard.verifyNavBarHeadings(navBarHeadings);
    await dashboard.verifySidebarVisible();

    //Verifying Navbar after expanding
    await dashboard.expandSection('Dashboard', ['Overview']);
    await dashboard.expandSection('Proposals', ['New Proposal', 'All Proposals']);
    await dashboard.expandSection('Email Marketing (BETA)', ['9 Bullets to Bind-it (BETA)', 'Document Library']);
    await dashboard.verifyStaticSidebarItems(['Tutorial Videos', 'Preeminent Coaching', 'Glossary']);
    await dashboard.expandSection('Support', ['FAQs', 'Send us a message', 'Start Guided Tour']);

    //Invite Functionality
    invitePage.completeInvitationFlow(fieldLabels, "JS", testData.firstName, testData.lastName, "TN", testData.email, roles)

    //Get Email in mailosaur
    const activationLink = await getActivationLinkFromMailosaur({
        serverId: 'srnbwjgi',
        apiKey: 'ya95ALTL6Ac57FNnCYGt0RMTOfChVHca',
        email: testData.email,
    })
    // Go to Activation Link
    await page.goto(activationLink);

    //Complete User Registration
    await completeUserRegistration(page, {
        password: testData.newUserPassword,
        expectedName: 'Test Name'
    });

});
