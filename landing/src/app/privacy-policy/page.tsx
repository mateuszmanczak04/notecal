import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../components/button';

const page = () => {
	return (
		<div className='mx-auto max-w-3xl px-8 py-12 '>
			<Button variant='secondary' asChild>
				<Link href='/'>
					<ChevronLeft /> go to home page
				</Link>
			</Button>
			<div className='mt-4 space-y-4 [&_a]:underline [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-bold [&_li_ul]:pl-8 [&_ul]:list-inside [&_ul]:list-disc'>
				<h1>Privacy Policy for Notecal</h1>
				<p>
					<strong>Last Updated:</strong> April 5, 2025
				</p>

				<h2>1. Introduction</h2>
				<p>
					This Privacy Policy describes how the Notecal web application (hereinafter referred to as the
					&quot;Application&quot;) collects, uses, and shares the personal data of its users. We are committed
					to protecting your privacy and ensuring the security of your personal data. By using our
					Application, you agree to the terms of this Privacy Policy.
				</p>

				<h2>2. Data Controller</h2>
				<p>
					The data controller of your personal data is Mateusz Mańczak, operating as a non-registered
					business, with the email address{' '}
					<a href='mailto:mateuszmanczak@icloud.com'>mateuszmanczak@icloud.com</a>.
				</p>

				<h2>3. What Personal Data Do We Collect?</h2>
				<p>While using the Application, we collect the following categories of personal data:</p>
				<ul>
					<li>
						<strong>Identification Data:</strong>
						<ul>
							<li>Email address (during registration and login).</li>
							<li>Password (stored in encrypted form).</li>
						</ul>
					</li>
					<li>
						<strong>Usage Data:</strong>
						<ul>
							<li>Date and time of account creation.</li>
							<li>Date and time of the last account update.</li>
							<li>Information about courses, tasks, and notes created by the user.</li>
						</ul>
					</li>
					<li>
						<strong>Data Related to Verification and Password Reset:</strong>
						<ul>
							<li>Email address and verification and password reset tokens (stored temporarily).</li>
						</ul>
					</li>
				</ul>

				<h2>4. For What Purposes Do We Process Your Personal Data?</h2>
				<p>We process your personal data for the following purposes:</p>
				<ul>
					<li>
						<strong>Providing the Application Services:</strong>
						<ul>
							<li>Enabling user account registration and login.</li>
							<li>Managing user accounts.</li>
							<li>Enabling the creation and management of courses, tasks, and notes.</li>
							<li>Displaying and personalizing content within the Application.</li>
						</ul>
					</li>
					<li>
						<strong>Communication:</strong>
						<ul>
							<li>Sending verification emails after registration.</li>
							<li>Sending emails to enable password reset.</li>
							<li>Responding to your inquiries and requests.</li>
						</ul>
					</li>
					<li>
						<strong>Ensuring the Security of the Application:</strong>
						<ul>
							<li>Monitoring and preventing unauthorized access and other illegal activities.</li>
						</ul>
					</li>
					<li>
						<strong>Improving the Application:</strong>
						<ul>
							<li>
								Analyzing how the Application is used to develop and optimize it (anonymous or
								pseudonymized data).
							</li>
						</ul>
					</li>
				</ul>

				<h2>5. On What Legal Basis Do We Process Your Personal Data?</h2>
				<p>The processing of your personal data is based on the following legal grounds:</p>
				<ul>
					<li>
						<strong>Performance of a contract:</strong> Processing is necessary for the provision of the
						Application services to you in accordance with the Terms of Service (Article 6(1)(b) GDPR).
					</li>
					<li>
						<strong>Legitimate interests of the controller:</strong> Processing is necessary for the
						purposes of the legitimate interests pursued by the controller, such as ensuring the security of
						the Application and improving its functionality (Article 6(1)(f) GDPR).
					</li>
					<li>
						<strong>Consent:</strong> For certain optional features or forms of communication, we may ask
						for your consent to process data for specific purposes (Article 6(1)(a) GDPR). (Currently not
						applicable, but worth noting for the future).
					</li>
				</ul>

				<h2>6. Who Do We Share Your Personal Data With?</h2>
				<p>Your personal data may be shared with the following categories of recipients:</p>
				<ul>
					<li>
						<strong>Email service providers:</strong> Mailgun.com, for sending verification and password
						reset emails.
					</li>
					<li>
						<strong>Hosting service providers:</strong> DigitalOcean.com (application servers).
					</li>
					<li>
						<strong>Database service providers:</strong> Vercel.com + neon.tech (database).
					</li>
					<li>
						<strong>Entities authorized by law:</strong> Public authorities, if we are legally obligated to
						do so.
					</li>
				</ul>
				<p>
					We ensure that our service providers process your data in accordance with applicable data protection
					laws.
				</p>

				<h2>7. How Long Do We Retain Your Personal Data?</h2>
				<p>
					Your personal data will be retained indefinitely, as long as your account in the Application remains
					active. Upon deletion of your account, your personal data will be permanently deleted from our
					database. Data related to verification and password reset are stored only for the time necessary to
					complete these processes.
				</p>

				<h2>8. What Are Your Rights Regarding the Processing of Personal Data?</h2>
				<p>According to the GDPR, you have the following rights:</p>
				<ul>
					<li>
						<strong>Right to access:</strong> You have the right to obtain confirmation as to whether or not
						your personal data is being processed, and, where that is the case, access to the personal data
						and related information.
					</li>
					<li>
						<strong>Right to rectification:</strong> You have the right to request the correction of
						inaccurate personal data or the completion of incomplete personal data.
					</li>
					<li>
						<strong>Right to erasure (&quot;right to be forgotten&quot;):</strong> You have the right to
						request the erasure of your personal data in certain situations, e.g., when the data is no
						longer necessary for the purposes for which it was collected.
					</li>
					<li>
						<strong>Right to restriction of processing:</strong> You have the right to request the
						restriction of the processing of your personal data in certain situations, e.g., when you
						contest the accuracy of the data.
					</li>
					<li>
						<strong>Right to object:</strong> You have the right to object to the processing of your
						personal data based on the legitimate interests of the controller.
					</li>
					<li>
						<strong>Right to data portability:</strong> You have the right to receive your personal data in
						a structured, commonly used, and machine-readable format and to transmit that data to another
						controller.
					</li>
					<li>
						<strong>Right to withdraw consent:</strong> If the processing of your data is based on your
						consent, you have the right to withdraw your consent at any time, without affecting the
						lawfulness of processing based on consent before its withdrawal (currently not applicable).
					</li>
					<li>
						<strong>Right to lodge a complaint with a supervisory authority:</strong> You have the right to
						lodge a complaint with a data protection supervisory authority, in particular in the Member
						State of your habitual residence, place of work, or place of the alleged infringement if you
						consider that the processing of your personal data infringes the GDPR.
					</li>
				</ul>
				<p>
					To exercise any of the above rights, please contact us at the following email address:{' '}
					<a href='mailto:mateuszmanczak@icloud.com'>mateuszmanczak@icloud.com</a>.
				</p>

				<h2>9. Cookies and Other Tracking Technologies</h2>
				<p>
					Our Application uses cookies for user authentication and to maintain login sessions. These are
					essential cookies that enable the proper functioning of the Application. We do not use cookies to
					track your activity for marketing purposes or other purposes beyond ensuring the Application&apos;s
					operation.
				</p>

				<h2>10. Data Security</h2>
				<p>
					We take all reasonable measures to protect your personal data from unauthorized access, loss,
					destruction, or alteration. We implement appropriate technical and organizational measures,
					including password encryption, server security, and access control.
				</p>

				<h2>11. Local Storage in Browser</h2>
				<p>
					Please be informed that your web browser may locally store Application settings in its Local
					Storage. This data is only used to personalize the interface and is not transmitted to our servers.
				</p>

				<h2>12. Changes to this Privacy Policy</h2>
				<p>
					We reserve the right to make changes to this Privacy Policy at any time. We will notify users of any
					significant changes by posting the updated Privacy Policy on the Application&apos;s website. We
					encourage you to periodically review the current version of this Privacy Policy.
				</p>

				<h2>13. Contact Us</h2>
				<p>
					If you have any questions or concerns regarding this Privacy Policy or the processing of your
					personal data, please contact us at the following email address:{' '}
					<a href='mailto:mateuszmanczak@icloud.com'>mateuszmanczak@icloud.com</a>.
				</p>
			</div>
		</div>
	);
};

export default page;
