import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Politique de confidentialité</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2>1. Introduction</h2>
              <p>
                AccesDirectAide s'engage à protéger la vie privée des utilisateurs de son site. 
                Cette politique de confidentialité explique comment nous collectons, utilisons et 
                protégeons vos données personnelles conformément au Règlement Général sur la Protection 
                des Données (RGPD).
              </p>
            </section>

            <section>
              <h2>2. Données collectées</h2>
              <p>Nous collectons les données suivantes :</p>
              <ul>
                <li><strong>Données d'identification</strong> : nom, prénom, adresse email</li>
                <li><strong>Données de contact</strong> : numéro de téléphone, adresse postale</li>
                <li><strong>Données de connexion</strong> : adresse IP, données de navigation</li>
                <li><strong>Documents</strong> : justificatifs déposés dans votre espace personnel</li>
              </ul>
            </section>

            <section>
              <h2>3. Finalités du traitement</h2>
              <p>Vos données sont collectées pour :</p>
              <ul>
                <li>Créer et gérer votre compte utilisateur</li>
                <li>Vous mettre en relation avec des professionnels</li>
                <li>Gérer vos rendez-vous et documents</li>
                <li>Vous informer sur les aides auxquelles vous pourriez avoir droit</li>
                <li>Améliorer nos services</li>
              </ul>
            </section>

            <section>
              <h2>4. Base légale</h2>
              <p>
                Le traitement de vos données repose sur votre consentement explicite lors de 
                l'inscription et sur l'exécution du contrat de service.
              </p>
            </section>

            <section>
              <h2>5. Destinataires des données</h2>
              <p>Vos données peuvent être transmises à :</p>
              <ul>
                <li>Les professionnels avec lesquels vous prenez rendez-vous (dans la limite nécessaire)</li>
                <li>Nos prestataires techniques (hébergement, maintenance)</li>
                <li>Les autorités compétentes en cas d'obligation légale</li>
              </ul>
            </section>

            <section>
              <h2>6. Durée de conservation</h2>
              <p>
                Vos données sont conservées pendant la durée de votre inscription, puis archivées 
                pendant 3 ans à compter de votre dernière activité. Les documents sont conservés 
                selon les obligations légales applicables.
              </p>
            </section>

            <section>
              <h2>7. Vos droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul>
                <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
                <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
                <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                <li><strong>Droit de limitation</strong> : limiter le traitement de vos données</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à : contact@accesdirectaide.fr
              </p>
            </section>

            <section>
              <h2>8. Sécurité</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
                protéger vos données contre tout accès non autorisé, modification, divulgation ou 
                destruction. Les données sont chiffrées et l'accès est strictement contrôlé.
              </p>
            </section>

            <section>
              <h2>9. Contact</h2>
              <p>
                Pour toute question concernant cette politique de confidentialité, vous pouvez nous 
                contacter à : contact@accesdirectaide.fr
              </p>
              <p>
                Vous pouvez également introduire une réclamation auprès de la CNIL (Commission Nationale 
                de l'Informatique et des Libertés).
              </p>
              <p className="text-muted-foreground">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
